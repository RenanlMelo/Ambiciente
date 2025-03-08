import Image from "next/image";
import React from "react";

export const Articles_content = () => {
  return (
    <>
      <div className="w-[80vw] ml-[20vw]">
        <Image
          src="/article1.png"
          alt="article background"
          className="w-full h-[48vh] bg-cover self-start"
        />
        <main className="bg-white h-[65vh] pl-[15vw] pr-[20vw] pt-[7vh]">
          <div id="1">
            <h3 className="text-[var(--main)] text-5xl font-semibold pb-4">
              Title - Example
            </h3>
            <p className="text-[var(--main)] leading-8 text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
              alias vitae, itaque ullam voluptatum tempora eum vero non nihil
              facilis. Eos nulla dicta aliquam voluptas pariatur ab, ducimus
              rerum sint.
            </p>
            <p className="text-[var(--mainHover)] text-lg">
              22 - february, 2025
            </p>
          </div>
          <div id="2" className="py-8">
            <h4 className="text-[var(--font-title)] text-3xl font-medium py-4">
              Subtitle - Example 1
            </h4>
            <p className="text-[var(--font-body)] leading-8 text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
              eius, voluptatem, deleniti porro maiores voluptatum quas aliquid
              mollitia culpa eos quam hic possimus ipsum corporis a fugiat.
              Doloribus, harum fuga. Quia quas vero rem eaque culpa aliquid,
              magnam beatae obcaecati ex repellat perferendis ducimus amet a,
              recusandae dignissimos! Ipsa, eveniet vero. Fugit beatae,
              perferendis nisi cumque neque exercitationem expedita impedit!
            </p>
          </div>
          <div id="3" className="py-8">
            <h4 className="text-[var(--font-title)] text-3xl font-medium py-4">
              Subtitle - Example 2
            </h4>
            <p className="text-[var(--font-body)] leading-8 text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
              eius, voluptatem, deleniti porro maiores voluptatum quas aliquid
              mollitia culpa eos quam hic possimus ipsum corporis a fugiat.
              Doloribus, harum fuga. Quia quas vero rem eaque culpa aliquid,
              magnam beatae obcaecati ex repellat perferendis ducimus amet a,
              recusandae dignissimos! Ipsa, eveniet vero. Fugit beatae,
              perferendis nisi cumque neque exercitationem expedita impedit!
            </p>
          </div>
          <div id="4" className="py-8">
            <h4 className="text-[var(--font-title)] text-3xl font-medium py-4">
              Subtitle - Example 3
            </h4>
            <p className="text-[var(--font-body)] leading-8 text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
              eius, voluptatem, deleniti porro maiores voluptatum quas aliquid
              mollitia culpa eos quam hic possimus ipsum corporis a fugiat.
              Doloribus, harum fuga. Quia quas vero rem eaque culpa aliquid,
              magnam beatae obcaecati ex repellat perferendis ducimus amet a,
              recusandae dignissimos! Ipsa, eveniet vero. Fugit beatae,
              perferendis nisi cumque neque exercitationem expedita impedit!
            </p>
          </div>
        </main>
      </div>
    </>
  );
};
