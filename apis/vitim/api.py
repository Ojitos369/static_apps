from app.core.bases.apis import PostApi
from .vitim import process_video_file

class ProcessVideo(PostApi):
    def main(self):
        video_b64 = self.request.data.get('video')
        options = self.request.data.get('options', {})
        
        if not video_b64:
            self.response = {'error': 'No video provided'}
            self.status = 400
            return

        result = process_video_file(video_b64, options)
        self.response = result
