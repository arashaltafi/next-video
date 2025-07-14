import ReactPlayer from "react-player";

export default function ReactPlayerPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">React Player Example</h1>
      <div className="player-wrapper">
        <ReactPlayer
          url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          controls
          playing={false}
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
}
