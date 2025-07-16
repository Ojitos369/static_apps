
import os
import base64
import uuid
from moviepy.editor import VideoFileClip
from django.conf import settings

def time_to_seconds(time_str):
    if isinstance(time_str, (int, float)):
        return time_str
    if ':' in time_str:
        parts = time_str.split(':')
        return int(parts[0]) * 60 + int(parts[1])
    return float(time_str)

def process_video_file(video_b64, options):
    video_data = base64.b64decode(video_b64.split(',')[1])
    temp_video_name = f"{uuid.uuid4()}.mp4"
    temp_video_path = os.path.join(settings.MEDIA_ROOT, 'image_temp', temp_video_name)

    with open(temp_video_path, 'wb') as f:
        f.write(video_data)

    clip = VideoFileClip(temp_video_path)
    
    start_time = time_to_seconds(options.get('start', 0))
    end_time = time_to_seconds(options.get('end', clip.duration))
    
    if end_time > clip.duration:
        end_time = clip.duration

    subclip = clip.subclip(start_time, end_time)
    
    output_folder = os.path.join(settings.MEDIA_ROOT, 'image_temp')
    base_name = options.get('base_name_for_images', 'frame')
    image_type = options.get('type', 'png')
    fps = options.get('fps', subclip.fps)

    subclip.write_images_sequence(
        os.path.join(output_folder, f"{base_name}_%04d.{image_type}"),
        fps=fps
    )
    
    clip.close()
    os.remove(temp_video_path)
    
    return {"message": "Video processed successfully"}
