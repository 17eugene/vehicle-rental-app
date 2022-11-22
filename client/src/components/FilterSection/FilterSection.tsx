import { useState, useCallback, MouseEvent, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

import FilterBlock from "../FilterBlock/FilterBlock";
import FilterBlockHeader from "../FilterBlockHeader/FilterBlockHeader";
import FilterBlockBody from "../FilterBlockBody/FilterBlockBody";
import FilterElement from "../FilterElement/FilterElement";

import { filterData } from "../../filterData";

import "../../styles/FilterSection/FilterSection.scss";

interface IFilterSectionProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  searchParams: URLSearchParams;
  checkedOptions: string[];
}

const FilterSection = ({ onChange, searchParams }: IFilterSectionProps) => {

  const [isOpenedFilterByClass, setIsOpenedFilterByClass] =
    useState<boolean>(true);
  const [isOpenedFilterByBody, setIsOpenedFilterByBody] =
    useState<boolean>(false);
  const [isOpenedFilterByTransmission, setIsOpenedFilterByTransmission] =
    useState<boolean>(false);

  const { t } = useTranslation();

  const toggleFilterMenu = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (
        e.currentTarget.parentElement?.firstElementChild?.className
          .toLowerCase()
          .includes("class")
      ) {
        setIsOpenedFilterByClass(!isOpenedFilterByClass);
        return;
      }

      if (
        e.currentTarget.parentElement?.firstElementChild?.className
          .toLowerCase()
          .includes("body")
      ) {
        setIsOpenedFilterByBody(!isOpenedFilterByBody);
        return;
      }

      if (
        e.currentTarget.parentElement?.firstElementChild?.className
          .toLowerCase()
          .includes("transmission")
      ) {
        setIsOpenedFilterByTransmission(!isOpenedFilterByTransmission);
        return;
      }

    },
    [
      isOpenedFilterByClass,
      isOpenedFilterByTransmission,
      isOpenedFilterByBody,
    ]
  );

  return (
    <div className="filter-section">
      <FilterBlock>
        <FilterBlockHeader
          text={t("filterTitleClass")}
          onClick={toggleFilterMenu}
          isOpenedFilter={isOpenedFilterByClass}
          variant="class"
        />
        {isOpenedFilterByClass && (
          <FilterBlockBody>
            {filterData.classType.map((type) => (
              <FilterElement
                key={type.id}
                type={type}
                onChange={onChange}
                checked={searchParams.has(type.value)}
              />
            ))}
          </FilterBlockBody>
        )}
      </FilterBlock>

      <FilterBlock>
        <FilterBlockHeader
          text={t("filterTitleBody")}
          onClick={toggleFilterMenu}
          isOpenedFilter={isOpenedFilterByBody}
          variant="body"
        />
        {isOpenedFilterByBody && (
          <FilterBlockBody>
            {filterData.bodyType.map((type) => (
              <FilterElement
                key={type.id}
                type={type}
                onChange={onChange}
                checked={searchParams.has(type.value)}
              />
            ))}
          </FilterBlockBody>
        )}
      </FilterBlock>

      <FilterBlock>
          <FilterBlockHeader
            text={t("filterTitleTransmission")}
            onClick={toggleFilterMenu}
            isOpenedFilter={isOpenedFilterByTransmission}
            variant="transmission"
          />
          {isOpenedFilterByTransmission && (
            <FilterBlockBody>
              {filterData.transmissionType.map((type) => (
                <FilterElement
                  key={type.id}
                  type={type}
                  onChange={onChange}
                  checked={searchParams.has(type.value)}
                />
              ))}
            </FilterBlockBody>
          )}
        </FilterBlock>
    </div>
  );
};

export default FilterSection;
