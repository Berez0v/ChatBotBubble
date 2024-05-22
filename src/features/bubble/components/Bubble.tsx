import { createSignal, Show, splitProps, onCleanup, createEffect } from 'solid-js';
import styles from '../../../assets/index.css';
import { BubbleButton } from './BubbleButton';
import { BubbleParams } from '../types';
import { Bot, BotProps } from '../../../components/Bot';

const defaultButtonColor = '#3B81F6';
const defaultIconColor = 'white';

export type BubbleProps = BotProps & BubbleParams;

export const Bubble = (props: BubbleProps) => {
  const [bubbleProps] = splitProps(props, ['theme']);




  const [isBotOpened, setIsBotOpened] = createSignal(false);
  const [isBotStarted, setIsBotStarted] = createSignal(false);

  const [height, setHeight] = createSignal(`${bubbleProps.theme?.chatWindow?.height ? bubbleProps.theme?.chatWindow?.height + 'px' : 'calc(100% - 100px)'}`);

  // Динамическое обновление высоты в зависимости от ширины экрана
  createEffect(() => {
    const updateHeight = () => {
      if (window.matchMedia('(max-width: 640px)').matches) {
        setHeight('calc(100%)');
      } else {

        setHeight(`${bubbleProps.theme?.chatWindow?.height ? bubbleProps.theme?.chatWindow?.height + 'px' : 'calc(100% - 100px)'}`);

      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  });



  const openBot = () => {
    if (!isBotStarted()) setIsBotStarted(true);
    setIsBotOpened(true);
  };

  const closeBot = () => {
    setIsBotOpened(false);
  };

  const toggleBot = () => {
    isBotOpened() ? closeBot() : openBot();
  };

  onCleanup(() => {
    setIsBotStarted(false);
  });

  return (
    <>
      <style>{styles}</style>
      <BubbleButton {...bubbleProps.theme?.button} toggleBot={toggleBot} isBotOpened={isBotOpened()} />
      <div
        part="bot"
        style={{
          height: height(),
          width: bubbleProps.theme?.chatWindow?.width ? `${bubbleProps.theme?.chatWindow?.width.toString()}px` : undefined,
          transition: 'transform 200ms cubic-bezier(0, 1.2, 1, 1), opacity 150ms ease-out',
          'transform-origin': 'bottom right',
          transform: isBotOpened() ? 'scale3d(1, 1, 1)' : 'scale3d(0, 0, 1)',
          'box-shadow': 'rgb(0 0 0 / 16%) 0px 5px 40px',
          'background-color': bubbleProps.theme?.chatWindow?.backgroundColor || '#ffffff',
          'z-index': 42424242,
          'border-radius': '28px'
        }}
        class={
          `fixed right-[1px] sm:right-5 sm:rounded-lg w-full sm:w-[400px] max-h-[100%] rounded-[18px] sm:max-h-[704px] ` +
          (isBotOpened() ? ' opacity-1' : ' opacity-0 pointer-events-none ') +
          (props.theme?.button?.size === 'large' ? ' bottom-0 sm:bottom-24 ' : ' bottom-0 sm:bottom-20 ')
        }
      >
        <Show when={isBotStarted()}>
          <Bot
            badgeBackgroundColor={bubbleProps.theme?.chatWindow?.backgroundColor}
            bubbleBackgroundColor={bubbleProps.theme?.button?.backgroundColor ?? defaultButtonColor}
            bubbleTextColor={bubbleProps.theme?.button?.iconColor ?? defaultIconColor}
            showTitle={bubbleProps.theme?.chatWindow?.showTitle}
            title={bubbleProps.theme?.chatWindow?.title}
            titleAvatarSrc={bubbleProps.theme?.chatWindow?.titleAvatarSrc}
            welcomeMessage={bubbleProps.theme?.chatWindow?.welcomeMessage}
            poweredByTextColor={bubbleProps.theme?.chatWindow?.poweredByTextColor}
            textInput={bubbleProps.theme?.chatWindow?.textInput}
            botMessage={bubbleProps.theme?.chatWindow?.botMessage}
            userMessage={bubbleProps.theme?.chatWindow?.userMessage}
            fontSize={bubbleProps.theme?.chatWindow?.fontSize}
            chatflowid={props.chatflowid}
            chatflowConfig={props.chatflowConfig}
            apiHost={props.apiHost}
            observersConfig={props.observersConfig}
            toggleBot={toggleBot}
            footerText={bubbleProps.theme?.chatWindow?.footerText}
          />
        </Show>
      </div>
    </>
  );
};
