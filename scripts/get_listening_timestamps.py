import whisper
import av
import numpy as np
import json

def load_audio_av(file, sr=16000):
    container = av.open(file)
    resampler = av.AudioResampler(format='fltp', layout='mono', rate=sr)
    frames = []
    for frame in container.decode(audio=0):
        for resampled_frame in resampler.resample(frame):
            frames.append(resampled_frame.to_ndarray())
    return np.concatenate(frames, axis=1).squeeze(0)

whisper.audio.load_audio = load_audio_av

model = whisper.load_model('base')
all_tracks = {}
for i in range(1, 6):
    f = f'public/audio/shinkanzen_listening/CD1/{i:02d} Track {i}.mp3'
    res = model.transcribe(f, language='ja')
    segments = []
    for s in res['segments']:
        segments.append({
            'start': round(s['start'], 2),
            'end': round(s['end'], 2),
            'text': s['text'].strip()
        })
    all_tracks[f'Track_{i}'] = segments

with open('tmp_inspect/whisper_results.json', 'w', encoding='utf-8') as out:
    json.dump(all_tracks, out, ensure_ascii=False, indent=2)

print('Saved to tmp_inspect/whisper_results.json')
