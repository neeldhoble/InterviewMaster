import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI-Personalized Interview | InterviewMaster.ai',
  description: 'Experience a tailored interview session with our AI interviewer. Get instant feedback and improve your interview skills.',
  keywords: ['AI Interview', 'Mock Interview', 'Interview Practice', 'Career Development', 'Job Interview'],
};

export default function AIPersonaliseInterviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-black text-white min-h-screen">
      {children}
    </div>
  );
}
