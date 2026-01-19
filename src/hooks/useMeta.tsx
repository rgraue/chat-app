import { useQuery } from "@tanstack/react-query";
import { config } from "../utils/config";

const MODELS_AVAILABLE_KEY = "MODELS_AVAILABLE_KEU";

interface MetaResponse {
  models: {
    name: string;
    model: string;
  }[];
}

export const useModelsAvailable = () => {
  return useQuery({
    queryKey: [MODELS_AVAILABLE_KEY],
    queryFn: getModels,
  });
};

const getModels = async () => {
  const result = await getMeta();

  if (result.ok) {
    const data = (await result.json()) as MetaResponse;
    return data.models.map((m) => m.name);
  }

  throw new Error("cannot inspect available models");
};

const getMeta = async () => {
  const configToUse = await config();

  return await fetch(`${configToUse.SERVER_URL}/api/tags`);
};
