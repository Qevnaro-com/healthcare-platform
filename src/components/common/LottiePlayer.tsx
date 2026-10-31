import React from 'react';
import { Lottie } from 'lottie-react';

interface LottiePlayerProps {
  src: object;
  loop?: boolean;
  autoplay?: boolean;
}

const LottiePlayer: React.FC<LottiePlayerProps> = ({ src, loop = true, autoplay = true }) => (
  <Lottie src={src} loop={loop} autoplay={autoplay} style={{ width: '100%', height: '100%' }} />
);

export default LottiePlayer;
