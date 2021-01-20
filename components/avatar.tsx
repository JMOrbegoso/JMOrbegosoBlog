type Props = {
  name: string;
  picture: string;
  web: string;
};

const Avatar = ({ name, picture, web }: Props) => {
  return (
    <a href={web} target="_blank">
      <div className="flex items-center">
        <img src={picture} className="w-12 h-12 rounded-full mr-4" alt={name} />
        <div className="text-xl font-bold">{name}</div>
      </div>
    </a>
  );
};

export default Avatar;
