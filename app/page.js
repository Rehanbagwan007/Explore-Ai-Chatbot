import Background from "./components/Background";
import Input from "./components/Input";

export default function Home() {
  return (
    <div className="flex flex-col justify-between items-center w-full h-screen bg-zinc-800">
      <div className="relative flex-grow w-full flex justify-center items-center">
        <Background />
      </div>

      <div className="w-full p-6">
        <Input />
      </div>
    </div>
  );
}
