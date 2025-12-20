import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ReactElement } from "react";
import { Link } from "react-router-dom";

export interface BreadcrumbData {
  name: string;
  path: string;
  icon?: ReactElement;
}

export interface BreadcrumbProps {
  data: BreadcrumbData[];
  className?: string;
}

export default function Breadcrumb({ data, className }: BreadcrumbProps) {
  return (
    <ul className={`flex items-center ${className}`}>
      {data.map((item, index, arr) => (
        <Link to={item.path} key={item.path}>
          <li className="flex items-center text-text1 text-sm font-medium hover:text-secondary">
            {item.icon && <span className="mr-1">{item.icon}</span>}

            <span className="mr-1">{item.name}</span>
            {index < arr.length - 1 && (
              <span>
                <FontAwesomeIcon icon={faAngleRight} />
              </span>
            )}
          </li>
        </Link>
      ))}
    </ul>
  );
}
