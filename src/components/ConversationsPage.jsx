import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { n3Conversations } from '../data/conversations_n3.js';
import { dailyConversations } from '../data/daily_conversations.js';
import '../assets/app_style.css'; 

const getEmojiForName = (name, text = "") => {
  if (!name) return '👤';
  const lower = name.toLowerCase();
  
  const isFemale = lower.includes('マリア') || lower.includes('秘書') || lower.includes('佐藤') || 
                   lower.includes('渡辺') || lower.includes('クララ') || lower.includes('ワン') || 
                   lower.includes('カリナ') || lower.includes('野村');
                   
  // Context-Based Action Emojis
  if (text) {
    if (text.includes('すみません') || text.includes('ごめんなさい') || text.includes('申し訳')) {
      return isFemale ? '🙇🏻‍♀️' : '🙇🏻‍♂️';
    }
    if (text.includes('わからない') || text.includes('どうして') || text.includes('なぜ') || text.includes('えっ')) {
      return isFemale ? '🤷🏻‍♀️' : '🤷🏻‍♂️';
    }
    if (text.includes('だめ') || text.includes('苦情') || text.includes('困り') || text.includes('怒')) {
      return isFemale ? '🤦🏻‍♀️' : '🤦🏻‍♂️';
    }
    if (text.includes('よろしく') || text.includes('おねがい') || text.includes('はい')) {
      return isFemale ? '🙋🏻‍♀️' : '🙋🏻‍♂️';
    }
  }
  
  // Base Person Emojis
  if (lower.includes('マリア') || lower.includes('クララ')) return '👱🏼‍♀️';
  if (lower.includes('アイ') || lower.includes('ユメ') || lower.includes('女')) return '👩🏻';
  if (lower.includes('ケン') || lower.includes('サトシ') || lower.includes('男') || lower.includes('ミラー')) return '👨🏻';
  
  if (isFemale) {
    if (lower.includes('秘書') || lower.includes('佐藤')) return '👩🏻‍💼';
    if (lower.includes('カリナ')) return '👩🏽';
    return '👩🏻';
  }
  
  // Older men / Professionals
  if (lower.includes('佐野') || lower.includes('管理人')) return '👴🏼';
  if (lower.includes('ワット') || lower.includes('森')) return '👨🏻‍🏫';
  if (lower.includes('課長') || lower.includes('シュミット')) return '👨🏼‍💼';
  
  // Workers
  if (lower.includes('通行人') || lower.includes('係員') || lower.includes('店員')) return '👨🏻‍🔧';
  
  // Specific men
  if (lower.includes('タワポン') || lower.includes('イー')) return '👨🏽‍🎓';
  if (lower.includes('ミラー')) return '👱🏼‍♂️';
  if (lower.includes('サントス')) return '👨🏽';
  
  // Default young men
  return '👨🏻'; 
};

const getEmotionIcon = (text) => {
  if (!text) return null;
  if (text.includes('すみません') || text.includes('ごめんなさい') || text.includes('申し訳')) return '💦';
  if (text.includes('苦情') || text.includes('だめ') || text.includes('困り') || text.includes('遅い') || text.includes('怒')) return '💢';
  if (text.includes('ありがとう') || text.includes('よろしく') || text.includes('おねがい') || text.includes('助かり')) return '✨';
  if (text.includes('？') || text.includes('どう') || text.includes('何') || text.includes('か。')) return '❓';
  if (text.includes('あっ') || text.includes('えっ') || text.includes('！') || text.includes('はっ')) return '❗';
  return null;
};

// Global reference to prevent garbage collection of utterances
window._currentUtterance = null;

const ConversationsPage = () => {
  const { level } = useParams();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('textbook'); // 'textbook' or 'daily'
  const [activeConv, setActiveConv] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [readingIndex, setReadingIndex] = useState(-1);
  const [activeReadState, setActiveReadState] = useState({ msgIndex: -1, litUntil: 0 });
  
  const feedRef = useRef(null);
  const playingRef = useRef(false);
  const resumeIndexRef = useRef(0);

  // Stop auto-play and speech when unmounting or changing conversation
  useEffect(() => {
    return () => {
      playingRef.current = false;
      setIsPlaying(false);
      window.speechSynthesis.cancel();
      window._currentUtterance = null;
    };
  }, [activeConv]);

  const conversationsList = level?.toLowerCase() === 'n3' ? n3Conversations : [];
  const displayList = activeTab === 'textbook' ? conversationsList : dailyConversations;

  // Select first conversation on load
  useEffect(() => {
    if (displayList.length > 0) {
      selectConversation(displayList[0]);
    }
  }, [activeTab, displayList]);

  const selectConversation = (conv) => {
    window.speechSynthesis.cancel();
    window._currentUtterance = null;
    playingRef.current = false;
    resumeIndexRef.current = 0;
    setActiveConv(conv);
    setMessages([]);
    setIsPlaying(false);
    setIsTyping(false);
    setReadingIndex(-1);
    setActiveReadState({ msgIndex: -1, litUntil: 0 });
  };

  const speakText = (text, messageIndex) => {
    return new Promise((resolve) => {
      if (!text || !playingRef.current) {
        resolve();
        return;
      }
      const utterance = new SpeechSynthesisUtterance(text);
      window._currentUtterance = utterance; // Prevent GC
      utterance.lang = 'ja-JP';
      // Adjust rate/pitch if needed
      utterance.rate = 0.4;
      
      utterance.onboundary = (event) => {
        if (event.name === 'word') {
          const length = event.charLength || 1; 
          setActiveReadState({ 
            msgIndex: messageIndex, 
            litUntil: event.charIndex + length 
          });
        }
      };
      
      utterance.onend = () => {
        resolve();
      };
      utterance.onerror = () => {
        resolve();
      }; // continue even if error
      
      window.speechSynthesis.speak(utterance);
    });
  };

  const startAutoPlay = async () => {
    if (!activeConv || isPlaying) return;
    
    // If we've reached the end, reset to start
    if (resumeIndexRef.current >= activeConv.messages.length) {
      resumeIndexRef.current = 0;
      setMessages([]);
    }

    window.speechSynthesis.cancel();
    setIsPlaying(true);
    playingRef.current = true;
    setActiveReadState({ msgIndex: -1, litUntil: 0 });

    for (let i = resumeIndexRef.current; i < activeConv.messages.length; i++) {
      if (!playingRef.current) break;
      resumeIndexRef.current = i;
      
      const msg = activeConv.messages[i];
      
      if (!playingRef.current) break;

      setMessages(prev => {
        // Prevent duplicating the message if we paused on it and are resuming
        if (prev.length > 0 && prev[prev.length - 1] === msg) return prev;
        return [...prev, msg];
      });
      scrollToBottom();
      
      if (msg.sender !== 'System') {
        setReadingIndex(i);
        setActiveReadState({ msgIndex: i, litUntil: 0 });
        await speakText(msg.text, i);
        setActiveReadState({ msgIndex: i, litUntil: msg.text.length });
        if (playingRef.current) {
          await new Promise(r => setTimeout(r, 2000)); // Natural pause between speakers
        }
      } else {
        setReadingIndex(-1);
        await new Promise(r => setTimeout(r, 1000));
      }
    }
    
    if (playingRef.current) {
      // Reached the end naturally
      setReadingIndex(-1);
      setIsPlaying(false);
      playingRef.current = false;
      resumeIndexRef.current = activeConv.messages.length;
    }
  };
  
  const scrollToBottom = () => {
    setTimeout(() => {
      if (feedRef.current) {
        feedRef.current.scrollTo({
          top: feedRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, 50);
  };

  // Calculate unique senders for dynamic chat layout
  const uniqueSenders = activeConv 
    ? [...new Set(activeConv.messages.map(m => m.sender).filter(s => s && s !== 'System'))]
    : [];

  return (
    <div className="min-h-screen bg-[#F7F7F8] dark:bg-[#111111] pt-[100px] pb-12 flex justify-center items-center px-4 font-sans text-zinc-800 dark:text-zinc-200">
      <div className="w-full max-w-5xl h-[85vh] md:h-[75vh] min-h-[600px] max-h-[900px] bg-white dark:bg-[#1A1A1A] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] flex flex-col md:flex-row overflow-hidden border border-zinc-200/50 dark:border-zinc-800">
        
        {/* Sidebar */}
        <div className={`w-full md:w-80 bg-[#FAFAFA] dark:bg-[#141414] border-r border-zinc-200/60 dark:border-zinc-800 flex-col ${activeConv ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-6 border-b border-zinc-200/60 dark:border-zinc-800 flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)} 
              className="text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
            >
              &larr;
            </button>
            <h2 className="text-[17px] font-semibold text-zinc-800 dark:text-zinc-100">
              {level?.toUpperCase()} Practice
            </h2>
          </div>
          
          <div className="flex p-2 border-b border-zinc-200/60 dark:border-zinc-800 bg-zinc-50 dark:bg-[#1A1A1A]">
            <button 
              onClick={() => setActiveTab('textbook')}
              className={`flex-1 text-[13px] font-medium py-1.5 rounded-md transition-colors ${activeTab === 'textbook' ? 'bg-white dark:bg-[#2A2A2A] shadow-sm text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 border border-transparent'}`}
            >
              Textbook
            </button>
            <button 
              onClick={() => setActiveTab('daily')}
              className={`flex-1 text-[13px] font-medium py-1.5 rounded-md transition-colors ${activeTab === 'daily' ? 'bg-white dark:bg-[#2A2A2A] shadow-sm text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 border border-transparent'}`}
            >
              Daily Life
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 space-y-1">
            {displayList.map(conv => {
              const isActive = activeConv?.id === conv.id;
              return (
                <div 
                  key={conv.id}
                  onClick={() => selectConversation(conv)}
                  className={`p-3 rounded-xl cursor-pointer flex items-center gap-3 transition-colors ${
                    isActive 
                      ? 'bg-white dark:bg-[#222] shadow-sm border border-zinc-200 dark:border-zinc-700' 
                      : 'hover:bg-zinc-100/50 dark:hover:bg-[#1E1E1E] border border-transparent'
                  }`}
                >
                  <div className={`w-10 h-10 flex items-center justify-center text-2xl`}>
                    {conv.icon}
                  </div>
                  <div className="font-medium flex-1 truncate text-[14px]">
                    {conv.title}
                  </div>
                </div>
              );
            })}
            {displayList.length === 0 && (
              <div className="p-6 text-center text-zinc-400 text-sm">
                No conversations available yet.
              </div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`flex-1 flex-col relative ${!activeConv ? 'hidden md:flex' : 'flex'}`}>
          {activeConv ? (
            <>
              {/* Header */}
              <div className="px-4 md:px-6 py-4 border-b border-zinc-200/60 dark:border-zinc-800 flex justify-between items-center bg-white dark:bg-[#1A1A1A] z-10">
                <div className="flex items-center gap-2 md:gap-3">
                  <button 
                    onClick={() => {
                      setActiveConv(null);
                      setIsPlaying(false);
                      window.speechSynthesis.cancel();
                    }}
                    className="md:hidden text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 px-2 py-1"
                  >
                    &larr;
                  </button>
                  <div className="w-10 h-10 flex items-center justify-center text-2xl hidden md:flex">
                    {activeConv.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-zinc-900 dark:text-zinc-100 text-[14px] md:text-[15px] truncate max-w-[150px] md:max-w-none">
                      {activeConv.title}
                    </div>
                    <div className="text-[11px] md:text-[12px] text-zinc-500 dark:text-zinc-400 tracking-wide uppercase">
                      Interactive Audio
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    if (isPlaying) {
                      playingRef.current = false;
                      setIsPlaying(false);
                      window.speechSynthesis.cancel();
                      setReadingIndex(-1);
                      setActiveReadState({ msgIndex: -1, litUntil: 0 });
                    } else {
                      startAutoPlay();
                    }
                  }}
                  className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg font-medium text-[12px] md:text-[13px] transition-colors flex items-center gap-1.5 md:gap-2 ${
                    isPlaying 
                      ? 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-200' 
                      : 'bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900'
                  }`}
                >
                  {isPlaying 
                    ? <>⏸ Pause</>
                    : (resumeIndexRef.current > 0 && resumeIndexRef.current < activeConv.messages.length)
                      ? '▶ Resume'
                      : (resumeIndexRef.current >= activeConv.messages.length)
                        ? '↺ Replay'
                        : '▶ Play'
                  }
                </button>
              </div>
              
              {/* Message Feed */}
              <div ref={feedRef} className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col gap-4 scroll-smooth bg-[#FAFAFA] dark:bg-[#141414] relative">
                {messages.map((msg, idx) => {
                  if (msg.sender === 'System') {
                    return (
                      <div key={idx} className="w-full flex justify-center my-2 animate-fade-in">
                        <span className="text-[11px] font-medium tracking-wide text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800/50 px-3 py-1 rounded-md">
                          {msg.text}
                        </span>
                      </div>
                    );
                  }
                  
                  const isYou = uniqueSenders.indexOf(msg.sender) % 2 === 0;
                  const originalIdx = activeConv.messages.indexOf(msg);
                  const isReadingThis = readingIndex === originalIdx;
                  const otherIsReading = readingIndex !== -1 && !isReadingThis;

                  return (
                    <div 
                      key={idx} 
                      className={`flex items-end gap-3 transition-all duration-300 ease-out ${isYou ? 'flex-row-reverse' : 'flex-row'} 
                        ${otherIsReading ? 'opacity-40 scale-[0.99] grayscale-[30%]' : 'opacity-100 scale-100'}
                        animate-slide-up`}
                    >
                      <div className="relative z-10">
                        <div 
                          className="w-16 h-16 flex items-center justify-center text-[48px] transition-transform duration-300"
                          style={{ transform: `scaleX(${isYou ? -1 : 1}) scale(${isReadingThis ? 1.15 : 1})` }}
                        >
                          {getEmojiForName(msg.sender, msg.text)}
                        </div>
                        
                        {/* Anime Emotion Icon */}
                        {isReadingThis && getEmotionIcon(msg.text) && (
                          <div className={`absolute -top-3 ${isYou ? '-right-2' : '-left-2'} text-3xl animate-bounce drop-shadow-md z-20`}>
                            {getEmotionIcon(msg.text)}
                          </div>
                        )}
                      </div>
                      
                      <div className={`flex flex-col max-w-[70%] ${isYou ? 'items-end' : 'items-start'}`}>
                        <span className="text-[11px] text-zinc-400 font-medium mb-1 px-1">
                          {msg.sender}
                        </span>
                        <div className={`px-4 py-3 text-[14px] leading-relaxed transition-all duration-300 relative
                          ${isYou 
                            ? 'bg-zinc-800 text-zinc-50 dark:bg-zinc-200 dark:text-zinc-900 rounded-2xl rounded-br-sm' 
                            : 'bg-white dark:bg-[#222] text-zinc-800 dark:text-zinc-200 rounded-2xl rounded-bl-sm border border-zinc-200/60 dark:border-zinc-700/50'}
                          ${isReadingThis 
                            ? 'ring-2 ring-zinc-300 dark:ring-zinc-600 shadow-sm' 
                            : 'shadow-sm'}
                        `}>
                          {/* Speaking Tail */}
                          <div className={`absolute bottom-[8px] w-0 h-0 border-y-[8px] border-y-transparent
                            ${isYou 
                              ? '-right-[10px] border-l-[12px] border-l-zinc-800 dark:border-l-zinc-200' 
                              : '-left-[10px] border-r-[12px] border-r-white dark:border-r-[#222] drop-shadow-sm'
                            }
                          `} />
                          {isReadingThis ? (
                            <div className="relative">
                              {msg.text.split('').map((char, i) => {
                                const isLit = activeReadState.msgIndex === originalIdx 
                                  ? i < activeReadState.litUntil
                                  : false;
                                return (
                                  <span 
                                    key={i}
                                    className={`transition-all duration-1000 ease-in-out font-medium inline-block ${
                                      isLit 
                                        ? (isYou ? 'text-zinc-50 dark:text-zinc-900 opacity-100 translate-y-0' : 'text-zinc-900 dark:text-zinc-100 opacity-100 translate-y-0')
                                        : 'opacity-0 translate-y-1'
                                    }`}
                                  >
                                    {char}
                                  </span>
                                );
                              })}
                            </div>
                          ) : (
                            msg.text
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
                
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-zinc-400 gap-4 p-8">
              <div className="w-24 h-24 rounded-full bg-zinc-50 dark:bg-[#1A1A1A] flex items-center justify-center text-4xl border border-zinc-100 dark:border-zinc-800/50 opacity-80">
                🎧
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">Select a conversation to begin</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Custom CSS for animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(25px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
    </div>
  );
};

export default ConversationsPage;
