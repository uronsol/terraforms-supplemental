import Terraforms_ABI from "../contracts/Terraforms.json";
import type { Terraforms } from "../contracts/types";
import { TERRAFORMS_ADDRESS } from "../lib";
import useContract from "./useContract";

export default function useTerraformsContract() {
  return useContract<Terraforms>(TERRAFORMS_ADDRESS, Terraforms_ABI);
}
