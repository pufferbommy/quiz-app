interface Props {
  children: React.ReactNode;
}

const CenteredLayout = ({ children }: Props) => {
  return (
    <div className="max-w-sm relative mx-auto h-full flex justify-center items-center">
      <main className="w-full">{children}</main>
    </div>
  );
};

export default CenteredLayout;
