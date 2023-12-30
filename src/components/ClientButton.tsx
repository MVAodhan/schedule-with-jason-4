"use client";

import Link from "next/link";

const ClientButton = ({ id }: { id: number }) => {
  return (
    <button>
      <Link href={`/edit/${id}`}>Edit</Link>
    </button>
  );
};

export default ClientButton;
