interface Props {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  return (
    <div className="max-w-4xl relative py-4 mx-auto h-full">
      <main className="w-full">{children}</main>
    </div>
  );
};

export default AdminLayout;
