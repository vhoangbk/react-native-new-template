export const userParser = (data: any) => {
  return {
    id: data.id,
    avatar: data.avatar,
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name,
    is_verified: data.is_verified,
    balance_amount: data.balance_amount,
    total_amount: data.total_amount,
    phone: data.phone,
    address: data.address,
    gender: data.gender,
  };
};
