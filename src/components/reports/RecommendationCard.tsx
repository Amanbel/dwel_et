import React from 'react';
import { Card } from '../common/Card';

interface Recommendation {
  id: string;
  title: string;
  description: string;
}

interface RecommendationCardProps {
  recommendations: Recommendation[];
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendations }) => {
  return (
    <Card hoverable={false}>
      <div className="flex items-center gap-sm mb-lg border-b border-outline-variant pb-sm">
        <span className="material-symbols-outlined text-primary">lightbulb</span>
        <h4 className="font-label-md text-label-md text-on-surface font-bold">Specific Recommendations</h4>
      </div>
      <ul className="space-y-md">
        {recommendations.map((rec) => (
          <li key={rec.id} className="flex items-start gap-sm">
            <span className="material-symbols-outlined text-secondary mt-0.5 text-[18px]">check_circle</span>
            <div>
              <p className="font-label-md text-label-md text-on-surface font-bold">{rec.title}</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs leading-relaxed">
                {rec.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
};
export default RecommendationCard;
