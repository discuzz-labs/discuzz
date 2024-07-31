interface PostContentProps {
    content: string;
  }
  
  const PostContent: React.FC<PostContentProps> = ({ content }) => {
    return (
      <div>
        <p className=" leading-loose tracking-wide max-h-48 overflow-hidden text-justify text-pretty">
          {content}
        </p>
      </div>
    );
  };
  
  export default PostContent;
  