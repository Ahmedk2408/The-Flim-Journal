import React from 'react';
import { Logo } from './Logo';

/**
 * Cinematic letterbox loader.
 *
 * Two black bars slide up from the bottom and down from the top to cover the
 * viewport, the TFJ wordmark glows in the center while data loads, then the
 * bars retract to reveal the site beneath — like a film starting.
 *
 * The bars are rendered as a fixed overlay *on top* of the app, so the reveal
 * is genuine rather than a swap. Mount with `closing={false}` while loading
 * and switch to `closing={true}` once data is ready to trigger the retract.
 */
interface LoaderProps {
  closing: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ closing }) => {
  return (
    <div
      className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center"
      style={{ transition: 'opacity 500ms ease', opacity: closing ? 0 : 1 }}
      aria-hidden={closing}
    >
      {/* Top bar — slides down to cover, retracts up when closing */}
      <div
        className="absolute top-0 left-0 right-0 bg-black"
        style={{
          height: '50vh',
          transform: closing ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'transform 900ms cubic-bezier(0.77, 0, 0.175, 1)',
        }}
      />
      {/* Bottom bar — slides up to cover, retracts down when closing */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-black"
        style={{
          height: '50vh',
          transform: closing ? 'translateY(100%)' : 'translateY(0)',
          transition: 'transform 900ms cubic-bezier(0.77, 0, 0.175, 1)',
        }}
      />

      {/* Center mark — shown while bars are closed */}
      <div
        className="relative z-10 flex flex-col items-center gap-6"
        style={{
          opacity: closing ? 0 : 1,
          transition: 'opacity 300ms ease',
        }}
      >
        <div className="tfj-loader-glow">
          <Logo variant="full" size="md" />
        </div>

        {/* Thin gold line with shimmer */}
        <div
          className="tfj-loader-shimmer relative h-px w-40 overflow-hidden bg-[#2E2E2E]"
        />
      </div>
    </div>
  );
};
