import AIChatInterface from '../components/ai/AIChatInterface';
import PageHeader from '../components/common/PageHeader';

export default function AIPage() {
  return (
    <div>
      <PageHeader 
        title="AI Assistant" 
        subtitle="Ask anything about your campus life"
        icon="🤖"
      />

      <div className="glass-card rounded-2xl p-6 max-w-4xl">
        <AIChatInterface isFullPage={true} />
      </div>
    </div>
  );
}