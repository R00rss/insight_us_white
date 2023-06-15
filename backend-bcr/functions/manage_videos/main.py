async def stream_video(video_path):
    with open(video_path, mode="rb") as file:
        while True:
            chunk = file.read(1024 * 1024)  # Read 1 MB at a time
            if not chunk:
                break
            yield chunk
