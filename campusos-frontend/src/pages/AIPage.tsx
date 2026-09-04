import AIChatInterface from '../components/ai/AIChatInterface';

export default function AIPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white">AI Assistant</h1>
        <p className="text-gray-400 text-sm">Ask anything about your campus life</p>
      </div>

      <div className="bg-[#0d0d14] border border-white/5 rounded-xl p-6 max-w-4xl">
        <AIChatInterface isFullPage={true} />
      </div>
    </div>
  );
}