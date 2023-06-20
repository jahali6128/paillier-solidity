
async function main() {

  const paillierSolidity = await ethers.deployContract("PaillierSolidity");
  console.log("PaillierSolidity deployed to:", (await paillierSolidity.getAddress()));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });



  