import React, { useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import SubHeading from "@/core/SubHeading";
import UserCardList from "@/core/UserCardList";
import SkeletonDate from "@/modules/skeleton/Dates/SkeletonDates";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Country, State, City } from "country-state-city";
import NoImage from "assets/img/no-image.png";
import Image from "next/image";
import { apiRequest } from "utils/Utilities";
import { fetchCities } from "../auth/forms/steps/validateRealTime";
import useWindowSize from "utils/useWindowSize";
import { useRef } from "react";

function DateAndLocation({
  currentLocationLoading,
  selectedLocation,
  show,
  openPopup,
  closePopup,
  receiverData,
  alreadyMessagedFromUser,
  setAlreadyMessagedFromUser,
  setLocation,
  growDiv,
}) {
  const [dateLength, setDateLength] = useState(0);
  const [loading, setLoader] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [pagination, setPagination] = React.useState("");
  const [dates, setDates] = React.useState([]);
  const [dateId, setDateId] = React.useState("");
  const { width } = useWindowSize();
  const scrollRef = useRef(null);

  const user = useSelector((state) => state.authReducer.user);

  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      const citiesData = City.getCitiesOfState(
        (selectedLocation?.country || user?.country_code)?.toUpperCase(),
        (selectedLocation?.province || user?.province)?.toUpperCase()
      ).filter((city) => city.name === "New Delhi");

      setCities(citiesData);
    };
    if (selectedLocation) {
      fetchCities();
    }
  }, [selectedLocation]);

  console.log("cities", cities);

  useEffect(() => {
    if (cities.length > 0) {
      checkDatesAvailability(cities);
    }
  }, [cities]);

  const checkDatesAvailability = (nearbyCities) => {
    for (let i = 0; i < 2; i++) {
      const city = nearbyCities[i];
      setTimeout(() => {
        const params = {
          location: nearbyCities[i]?.name,
          province: nearbyCities[i]?.stateCode,
          current_page: 1,
          per_page: 10,
        };

        fetchDate(params);
      }, 10000);
    }
    // If no city with available dates is found, show a message to the user
    // alert("No available dates in nearby cities");
  };

  const fetchDates = (city) => {
    axios
      .get(`your_api_endpoint?city=${city}`)
      .then((response) => {
        // Update the state variable for the available dates
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setDateLength(dates?.length);
  }, [dates]);

  const nextPage = () => {
    setTimeout(() => {
      const params = {
        location: selectedLocation?.city,
        province: selectedLocation?.province,
        current_page: page + 1,
        per_page: 10,
      };
      setPage(page + 1);
      fetchDate(params);
    }, 500);
  };

  const lastClickedDate = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchDate = async (params) => {
    try {
      setLoader(true);
      const res = await apiRequest({
        url: "date",
        params: params,
      });
      console.log("res dates of user", res);

      if (res?.data?.data?.pagination?.current_page !== 1) {
        res?.data?.data?.dates;
        // .sort(function (a, b) {
        //   return new Date(b.created_at) - new Date(a.created_at);
        // });
        // setTimeout(() => {
        setDates([...dates, ...res?.data?.data?.dates]);
        // }, 500);
      } else {
        res?.data?.data?.dates;
        // .sort(function (a, b) {
        //   return new Date(b.created_at) - new Date(a.created_at);
        // });
        setTimeout(() => {
          setDates(res?.data?.data?.dates);
        }, 2000);
      }
      setPagination(res?.data?.data?.pagination);
      setTimeout(() => {
        setLoader(false);
      }, 2000);
    } catch (err) {
      setDates([]);
      setLoader(false);
    }
  };

  useEffect(() => {
    if (selectedLocation?.city && !show) {
      const params = {
        location: selectedLocation?.city,
        current_page: page,
        per_page: 10,
        province: selectedLocation?.province,
      };
      //   if (selectedLocation?.stateName && selectedLocation?.countryName) {
      //     nearByCities();
      //   }

      fetchDate(params);
    }
  }, [selectedLocation, show]);

  const nearByCities = async () => {
    const cities = await fetchCities(
      selectedLocation?.stateName,
      selectedLocation?.countryName
    );
    console.log("cities", cities);
  };

  return (
    <InfiniteScroll
      // scrollableTarget="infiniteScroll"
      dataLength={dateLength}
      next={() => {
        nextPage();
      }}
      scrollThreshold={0.5}
      hasMore={!loading && pagination?.total_pages !== page}
      style={{ overflowX: "hidden", scrollBehavior: "smooth" }}
    >
      <div className="row">
        {currentLocationLoading || (loading && dates.length === 0)
          ? [1, 2, 3, 4, 5, 6].map((n) => (
              <div className={`col-xl-6 col-lg-12`}>
                <SkeletonDate key={n} theme="dark" />
              </div>
            ))
          : dates.length > 0 &&
            dates.filter((item) => item?.date_status === true)?.length > 0
          ? dates
              .filter((item) => item?.date_status === true)
              .map((item, index) => (
                <div
                  className={`col-xl-6 col-lg-12 ${
                    (width > 767 && (index === 2 || index === 3)) ||
                    index === 0 ||
                    index === 1
                      ? "scrollActive"
                      : ""
                  }`}
                  id={`scrolldiv`}
                  key={index}
                  onClick={() => {
                    // if (index === dates?.length - 1) {
                    lastClickedDate();
                    // }
                  }}
                >
                  {width > 767 ? (
                    <UserCardList
                      setDateId={setDateId}
                      date={item}
                      cardId={`grow-${index}`}
                      openPopup={() => {
                        openPopup(item);
                      }}
                      closePopup={closePopup}
                      dateId={dateId}
                      isDesktopView={true}
                      key={index}
                      ref={scrollRef}
                      loading={loading}
                      setLoader={setLoader}
                      receiverData={receiverData}
                      alreadyMessagedFromUser={alreadyMessagedFromUser}
                      setAlreadyMessagedFromUser={setAlreadyMessagedFromUser}
                    />
                  ) : (
                    <UserCardList
                      setDateId={setDateId}
                      date={item}
                      cardId={`grow-${index}`}
                      openPopup={() => {
                        openPopup(item);
                      }}
                      setLoader={setLoader}
                      closePopup={closePopup}
                      growDiv={growDiv}
                      dateId={dateId}
                      key={index}
                      ref={scrollRef}
                      loading={loading}
                      receiverData={receiverData}
                      alreadyMessagedFromUser={alreadyMessagedFromUser}
                      setAlreadyMessagedFromUser={setAlreadyMessagedFromUser}
                    />
                  )}
                </div>
              ))
          : !loading && (
              <div className="no-message-card-date">
                <figure>
                  <Image src={NoImage} alt="NoImage" width={205} height={140} />
                </figure>
                <h6>Sorry, no dates found for the selected location</h6>
                <SubHeading title="Find a date by changing the location!" />
              </div>
            )}
        {loading &&
          [1, 2, 3, 4, 5, 6].map((n) => (
            <div className={`col-xl-6 col-lg-12`}>
              <SkeletonDate key={n} theme="dark" />
            </div>
          ))}
      </div>
    </InfiniteScroll>
  );
}

export default DateAndLocation;
