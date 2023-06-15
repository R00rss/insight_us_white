import React from "react";
import capitalizeFirstLetterWords, {
  capitalizeFirstLetterWord,
} from "../../functions/ManageStr";

const Posts = ({ items, handleSelect }) => {
  console.log(items, "items");
  return (
    <section className="max-h-[350px] overflow-y-auto flex flex-col mx-2 ">
      {items.map((item, i) => (
        <div
          key={i}
          className="even:bg-sky-200 odd:bg-white gap-1 grid grid-cols-[2fr_1fr_2fr_1fr_1fr_1fr_1fr_2fr_2fr_2fr_1fr] px-3 text-slate-900 rounded-b-sm"
          onClick={() => handleSelect(item)}
        >
          {item.map((subItem, j) => {
            if (j < item.length - 2) {
              return (
                <span
                  className="flex justify-start items-center cursor-pointer"
                  key={j}
                >
                  {j === 0
                    ? capitalizeFirstLetterWords(subItem)
                    : capitalizeFirstLetterWord(subItem)}
                </span>
              );
            }
          })}
        </div>
      ))}
    </section>
  );
};

export default Posts;
