import { gql } from '@urql/core';

const getDeliveryOptions = gql`
query getDeliveryOptions($id: String!) {
  merchantInfo(id:$id){
    deliveryOptions {
      results {
        id
        nameKey
        descriptionKey
        isActive
        isEditable
        pickupType
        feeType
        fee{
          type
          centAmount
          currencyCode
        }
        provisioningDurationType
        provisioningDuration{
          min
          max
          unit
        }
      }
    }
  }
}`;

export default getDeliveryOptions;
