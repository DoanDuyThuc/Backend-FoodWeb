import Routers from './router';
import './App.scss';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useQuery } from '@tanstack/react-query';
import { GetMeService, GetOrderUserService } from './services/authService';
import { GetAllFoodService, GetAllRestaurantService } from './services/RestaurantService';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = useSelector(state => state.auth.id);

  const dispatch = useDispatch();

  // query 
  const { data: restaurants } = useQuery({
    queryKey: ['GetAllRestaurant', {}],
    queryFn: async ({ queryKey }) => {
      const [, { }] = queryKey;
      const res = await GetAllRestaurantService();
      return res;
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  })

  const { data: foods } = useQuery({
    queryKey: ['GetAllFood', {}],
    queryFn: async ({ queryKey }) => {
      const [, { }] = queryKey;
      const res = await GetAllFoodService();
      return res;
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  })

  //query
  const { data: orders } = useQuery({
    queryKey: ['GetAllOrder', { userId: user?.id || userId }],
    queryFn: async ({ queryKey }) => {
      const [, { userId }] = queryKey;
      const res = await GetOrderUserService({ userId });
      return res;
    },
    enabled: !!user.id,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (restaurants) {
      dispatch({ type: 'restaurant/setRestaurants', payload: restaurants });
    }
    if (foods) {
      dispatch({ type: 'restaurant/setFoods', payload: foods });
    }
    if (orders) {
      dispatch({ type: 'auth/setOrdersUser', payload: orders });
    }
  }, [restaurants, foods, orders, dispatch])

  return (
    <div className="App">
      <Routers />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
