import { createRequest, throwResErrors } from "@/lib/axios";
import { Carrier } from "@/types/carrierTypes";

export const getTopCarriersByDirection = async (
  from_city: string,
  to_city: string
): Promise<Carrier[]> => {
  try {
    const res = await createRequest().get("/carriers/top-by-direction", {
      params: {
        from_city,
        to_city,
      },
    });
    return res.data;
  } catch (err) {
    throwResErrors(err);
    return [];
  }
};
