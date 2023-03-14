import { useState } from "react";
import Head from "next/head";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Home() {
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

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
      await sleep(1000);
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
