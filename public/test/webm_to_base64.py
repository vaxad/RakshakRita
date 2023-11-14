from pydub import AudioSegment
from pydub.playback import play

def webm_to_wav(input_file_path, output_file_path):
    try:
        # Load WebM audio using pydub
        audio = AudioSegment.from_file(input_file_path, format="webm")

        # Export audio to WAV file
        audio.export(output_file_path, format="wav")

        print(f'Successfully converted WebM to WAV. Output saved to: {output_file_path}')

    except Exception as e:
        print(f'Error: {e}')

# Example usage:
input_file_path = "output.webm"
output_file_path = "output.wav"
webm_to_wav(input_file_path, output_file_path)
#C:/Users/varadDownloads/processing-4.1.1-windows-x64/processing-4.1.1/tools/MovieMaker/tool/ffmpeg.exe