import { Client, createClient } from "@urql/core";
import getDeliveryOptions from "./get-delivery-options.query";
import { ApolloQueryManager, IQueryManager, UrqlQueryManager } from "./query-manager";

export interface IDeliveryOption {
  descriptionTranslationKey?: string;
  delivery?: any;
  hint?: string;
  id: string;
  image?: any;
  titleTranslationKey: string;
  packageInfo?: string;
  packageInfoContent?: string;
  type: any;
  pickUpAddress?: any;
  prNumber?: string;
}

export class Service {
  queryManager: IQueryManager;

  constructor() {
    this.queryManager = new ApolloQueryManager();
  }

  

  public async getDeliveryOptions(merchantId: string): Promise<IDeliveryOption[]> {
    const variables = {
      id: merchantId,
    };

    const queryResult = await this.queryManager?.query(getDeliveryOptions, variables);
    const deliveryOptionsResult = queryResult?.data.merchantInfo?.deliveryOptions?.results;
    return Promise.resolve<IDeliveryOption[]>(deliveryOptionsResult.map(this.transformToIDeliveryOption));
  }

  private transformToIDeliveryOption = (
    deliveryOptionsData: any,
  ): IDeliveryOption => {
    return {
      delivery: deliveryOptionsData,
      descriptionTranslationKey: deliveryOptionsData.descriptionKey ?? '',
      id: deliveryOptionsData.nameKey ?? '',
      titleTranslationKey: deliveryOptionsData.nameKey ?? '',
      type: deliveryOptionsData.pickupType,
    };
  }

}