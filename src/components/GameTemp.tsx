//   const updateItem = (indexToUpdate: number, newValue: string) => {
//     setSelected((prev) => {
//       const newItems = [...prev];
//       if (newItems[indexToUpdate] === "") {
//         newItems[indexToUpdate] = newValue;
//       }
//       return newItems;
//     });
//   };

//   const handleTurn = () => {
//     if (turn === "xMark") {
//       setTurn("oMark");
//     } else {
//       setTurn("xMark");
//     }
//   };

//   const handleAi = () => {
//     const emptyIndexes = selected
//       .map((v, idx) => (v === "" ? idx : -1))
//       .filter((i) => i !== -1);

//     if (aiMark === "xMark") {
//       if (turn === "xMark") {
//         const randoxIdx =
//           emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];

//         updateItem(randoxIdx, aiMark);
//       }
//     } else if (aiMark === "oMark") {
//       if (turn === "oMark") {
//         const randoxIdx =
//           emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];

//         updateItem(randoxIdx, aiMark);
//       }
//     }
//   };

//   const handleAiFirst = () => {
//     const emptyIndexes = selected
//       .map((v, idx) => (v === "" ? idx : -1))
//       .filter((i) => i !== -1);

//     if (aiMark === "xMark" && emptyIndexes.length > 0 && turn === "xMark") {
//       const randoxIdx =
//         emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];

//       updateItem(randoxIdx, aiMark);
//     }
//   };

//   const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     console.log(selected);

//     updateItem(Number(e.currentTarget.value), pickMark);
//   };

//   useEffect(() => {
//     if (didRunRef.current) return;
//     didRunRef.current = true;
//     handleAiFirst();
//     handleTurn();
//   }, []);

//   useEffect(() => {
//     handleAi();
//     handleTurn();
//   }, [selected]);
