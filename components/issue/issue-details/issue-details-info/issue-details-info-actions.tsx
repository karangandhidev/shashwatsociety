import { ChildrenTreeIcon } from "@/components/svgs";
import { Button } from "@/components/ui/button";
import { TooltipWrapper } from "@/components/ui/tooltip";

const IssueDetailsInfoActions: React.FC<{
  onAddChildIssue: () => void;
  variant?: "sm" | "lg";
}> = ({ onAddChildIssue, variant = "sm" }) => {
  return (
    <div className="flex gap-x-2 text-gray-700">
      <TooltipWrapper text="Add child issue">
        <Button
          onClick={onAddChildIssue}
          customColors
          className="flex items-center whitespace-nowrap bg-gray-100 hover:bg-gray-200"
        >
          <ChildrenTreeIcon />
          <span
            data-state={variant === "sm" ? "sm" : "lg"}
            className="whitespace-nowrap text-sm  font-medium [&[data-state=lg]]:ml-2"
          >
            {variant === "sm" ? null : "Add a child issue"}
          </span>
        </Button>
      </TooltipWrapper>
    </div>
  );
};

export { IssueDetailsInfoActions };
