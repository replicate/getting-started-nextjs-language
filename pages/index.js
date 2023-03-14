import { useState } from "react";
import Head from "next/head";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Home() {
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [showDialog, setShowDialog] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: e.target.prompt.value,
      }),
    });
    let prediction = await response.json();
    if (response.status !== 201) {
      setError(prediction.detail);
      return;
    }
    setPrediction(prediction);

    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      await sleep(500);
      const response = await fetch("/api/predictions/" + prediction.id);
      prediction = await response.json();
      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }
      console.log({ prediction });
      setPrediction(prediction);
    }
  };

  return (
    <div className="max-w-screen-md bg-white mx-auto m-10 p-10 rounded-lg">
      <Head>
        <title>Replicate + Next.js + FLAN-T5</title>
      </Head>

      {/* Uncomment the following lines if you want to display a welcome dialog
      {showDialog && (
        <dialog
          className="fixed w-screen h-screen bg-black bg-opacity-50 inset-0 flex justify-center items-center z-50"
        >
          <article className="content-container bg-white p-8 overflow-y-scroll max-h-screen">
            <h4 className="mb-4">Welcome to ...</h4>

            <p className="mb-8">
              By using this model, you agree to the following terms and
              conditions:
            </p>

            <ol className="list-decimal mx-6 pl-2 mb-8">
              <li>...</li>
            </ol>

            <button
              className="p-3 px-6 bg-black text-white"
              onClick={() => setShowDialog(false)}
            >
              I Agree
            </button>
          </article>
        </dialog>
      )} 
      */}

      <h1 className="text-3xl text-center p-10">
        Replicate + Next.js + FLAN-T5
      </h1>

      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          name="prompt"
          placeholder="Ask a question"
          className="flex-grow"
        />
        <button type="submit" className="p-3 px-6 bg-black text-white">
          Go!
        </button>
      </form>

      {error && <div>{error}</div>}

      {prediction && (
        <div className="py-10">
          {prediction.output && <div>{prediction.output}</div>}
          <p className="text-sm opacity-50 pt-10">
            status: {prediction.status}
          </p>
        </div>
      )}
    </div>
  );
}
