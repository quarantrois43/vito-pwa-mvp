interface ProgressBarProps {
  percentage: number
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  return (
    <div className="w-full bg-neutral-200 dark:bg-neutral-800 rounded-full h-2">
      <div
        className="bg-primary h-2 rounded-full transition-all duration-500"
        style={{ width: `${Math.min(100, percentage)}%` }}
      />
    </div>
  )
}