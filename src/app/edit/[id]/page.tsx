const page = ({ params }: { params: { id: number } }) => {
  const { id } = params;

  return <div>{id}</div>;
};

export default page;
