type Props = {
  prompt: string;
  onPromptClick?: () => void;

};
export const StarterPromptBubble = (props: Props) => (
  <>
    <div
      data-modal-target="defaultModal"
      data-modal-toggle="defaultModal"
      class="flex justify-start md:w-[48%]  items-start animate-fade-in host-container hover:brightness-110 active:brightness-75 "
      onClick={() => props.onPromptClick?.()}
    >
      <span
        class="px-4 py-2 md:!w-full h-full text-[16px] md:text-[14px]  md:whitespace-pre-wrap md:break-words max-w-full chatbot-host-bubble border-[1px]  border-gray-300 text-gray-600 font-body font-normal"
        data-testid="host-bubble"
        style={{
          width: "max-content",
          'border-radius': '12px',
          cursor: 'pointer',
        }}
      >
        {props.prompt}
      </span>
    </div>
  </>
);
