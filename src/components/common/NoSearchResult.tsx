interface NoSearchResultProps {
  imgWidth?: string;
  textSize?: string;
  text?: string;
}

const NoSearchResult = ({
  imgWidth = '120px',
  textSize = '18px',
  text = 'No result found',
}: NoSearchResultProps) => {
  return (
    <div className="flex size-full min-h-full  flex-col items-center justify-center gap-4 p-8">
      <div className="flex items-center justify-center">
        <img
          src="/assets/images/no_result.svg"
          alt="No Search Result"
          style={{ width: imgWidth }}
        />
      </div>
      <div
        style={{ fontSize: textSize }}
        className={`font-sfProTextSemibold text-textTertiary font-semibold`}
      >
        {text}
      </div>
    </div>
  );
};

export default NoSearchResult;
