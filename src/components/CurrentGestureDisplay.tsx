interface CurrentGestureDisplayProps {
  gesture: string | null;
}

const CurrentGestureDisplay = ({ gesture }: CurrentGestureDisplayProps) => {
  return (
    <div className="flex items-center justify-center h-full">
      {gesture ? (
        <div className="text-center animate-in zoom-in duration-200">
          <div className="text-8xl font-bold text-primary mb-4 drop-shadow-[var(--shadow-glow)]">
            {gesture}
          </div>
          <p className="text-muted-foreground text-lg">Detected Sign</p>
        </div>
      ) : (
        <div className="text-center">
          <div className="text-6xl text-muted-foreground mb-4">👋</div>
          <p className="text-muted-foreground">
            Show a sign to begin
          </p>
        </div>
      )}
    </div>
  );
};

export default CurrentGestureDisplay;
