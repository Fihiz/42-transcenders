export interface if_stats {
  login: string;
  match_number: number;
  victory: number;
  loss: number;
  points_for_ladder: number;
  highest_score: number;
  worst_score: number;
  scored_points: number;
  adversary_points: number;
  longest_match: number;
  shortest_match: number;
  created_stat: Date;
  updated_stat: Date;
  achievement_id: number;
  award_date: Date;
  award_detail: string;
  award_icon: string;
}

export interface if_stats_object {
  login: {
    login: string;
    pseudo: string;
    avatar: string;
    status: string;
    bio: string;
    pending_queue: boolean;
    banned: boolean;
    admonishement: number;
    app_role: string;
    created: Date;
    updated: Date;
  };
  match_number: number;
  victory: number;
  loss: number;
  points_for_ladder: number;
  scored_points: number;
  adversary_points: number;
  ball_hit: number;
  created: Date;
  updated: Date;
}
