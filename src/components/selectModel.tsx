import { createListCollection, Portal, Select } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { config } from "../utils/config";
import { useSystem } from "../context/systemContext";

export const SelectModel = ({ models }: { models: string[] }) => {
  const system = useSystem();
  const [activeModel, setActiveModel] = useState<string[]>();

  useEffect(() => {
    const load = async () => {
      const c = await config();

      if (models.includes(c.MODEL)) {
        setActiveModel([c.MODEL]);
      } else {
        setActiveModel(["Please Select Model"]);
      }
    };

    load();
  }, []);

  const activeModelHelper = (e: any) => {
    setActiveModel(e.value);
    system.setStateValue("model", e.value[0]);
  };

  return (
    <Select.Root
      collection={createListCollection({ items: models })}
      size="sm"
      width="20vh"
      value={activeModel}
      onValueChange={(e: any) => activeModelHelper(e)}
    >
      <Select.HiddenSelect />
      {/* @ts-ignore */}
      <Select.Control>
        {/* @ts-ignore */}
        <Select.Trigger>
          {/* @ts-ignore */}
          <Select.ValueText placeholder={activeModel} />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        {/* @ts-ignore */}
        <Select.Positioner>
          {/* @ts-ignore */}
          <Select.Content>
            {models.map((model) => (
              // @ts-ignore
              <Select.Item item={model} key={model}>
                {model}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};
