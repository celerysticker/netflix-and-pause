Netflix & Pause
================

Pause the video when someone interrupts your chill session.

### Inspiration
You know how sometimes you're watching Netflix/YouTube/Hulu/etc and then a "friend" starts talking and you miss the punchline in your show? And then you pause the video to talk to this friend and/or rewind and watch it again? Netflix & Pause is for you. With this Chrome extension, your video will pause automatically when someone talks over the video and play again once the conversation is over.

### What it does
Netflix & Pause is a Chrome extension that works on pages with videos. When a conversation is detected, the video is paused for the duration of the conversation. Beyond watching videos for leisure with friends, this technology could be used to integrate video demos and lectures in classrooms. The teacher can play an educational video (such as a demo or Khan academy lecture), and then answer student questions and enhance the presentation seamlessly with explanations.

### How we built it
We built on TreeHacks' Cal-to-Butt Chrome extension hackpack, thanks TreeHacks team! Speech-to-text is done with the Web Speech API.

### Challenges we ran into
Audio processing. It was difficult to distinguish between the presenter of TED talk video and the user. No speech-to-text API (1) had the built-in function of subtracting system audio and (2) could run locally without sending ALL audio to the cloud for processing. In the end, we went with a lightweight web API and checked for potential speech sounds rather than certain English. 

### Accomplishments that we're proud of
No one on our team has built a Chrome extension before or had extensive experience with javascript, but we were able to pull together a functioning extension.

### What we learned
APIs are awesome and powerful but you have to look more closely at how they interface with input/output.

### What's next for Netflix & Pause
Since we're already getting the audio transcript, the next logical step is to listen for keywords to allow users to play, pause, and rewind the video with voice commands. Additionally, with better audio processing (e.g, the ability the isolate the user's voice from video audio), we would want to make this work just as effectively without headphones for a better group viewing experience. We'd also like to build a platform agnostic version that works with TVs, etc.
