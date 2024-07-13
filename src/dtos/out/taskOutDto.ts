interface PickUpAndDeliveryTaskOutDto {
  pickUpPersonContact: {
    name: string;
    phoneNumber: string;
  };
  deliveryPersonContact: {
    name: string;
    phoneNumber: string;
  };
  description: string;
  confirmationCode: number;
  pickUpRoom?: string;
  deliveryRoom?: string;
}

interface SurveillanceTaskOutDto {
  emergencyPhoneNumber: string;
  startingPointToWatch?: string;
  endingPointToWatch?: string;
}

export default interface TaskOutDto {
  robisepType?: string;
  iamId: string;

  // Pickup and delivery task
  pickUpAndDeliveryTask?: PickUpAndDeliveryTaskOutDto;

  // Surveillance task
  surveillanceTask?: SurveillanceTaskOutDto;
}
