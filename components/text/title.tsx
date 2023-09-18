interface Props {
  children: React.ReactNode;
}

const Title = ({ children }: Props) => {
  return <h1 className="text-4xl mb-4 text-center">{children}</h1>;
};

export default Title;
