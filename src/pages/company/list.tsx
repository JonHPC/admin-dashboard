import React from "react";
import { CreateButton, DeleteButton, EditButton, FilterDropdown, List, useTable } from "@refinedev/antd";
import { getDefaultFilter, useGo, type HttpError } from "@refinedev/core";
import { Input, Space, Table } from "antd";
import { COMPANIES_LIST_QUERY } from "@/graphql/queries";
import { SearchOutlined } from "@ant-design/icons";
import type { GetFieldsFromList } from "@refinedev/nestjs-query";
import type { CompaniesListQuery } from "@/graphql/types";
import CustomAvatar from "@/components/custom-avatar";
import { Text } from "@/components";
import { currencyNumber } from "@/utilities";

type Company = GetFieldsFromList<CompaniesListQuery>;

export const CompanyList = ({children}: React.PropsWithChildren) => {
 // useGo is used to navigate to a different path
  const go = useGo();

  // useTable hook, similar to useList, but with additional benefits
  const { tableProps, filters } = useTable<Company, HttpError, Company>({
    resource: "companies",
    onSearch: (values) => {
      return [
        {
          field: "name",
          operator: "contains",
          value: values.name
        }
      ]
    },
    pagination: {
      pageSize: 12,
    },
    sorters: {
      initial: [
        {
          field: "createdAt",
          order: "desc"
        }
      ]
    },
    filters: {
      initial: [
        {
          field: "name",
          operator: "contains",
          value: undefined
        }
      ]
    },
    meta: {
      gqlQuery: COMPANIES_LIST_QUERY
    }
  })

  return (
    <div>
      <List
        breadcrumb={false}
        headerButtons={() => (
          <CreateButton
            onClick={(() => {
              go({
                to: {
                  resource: "companies",
                  action: "create"
                },
                options: {
                  keepQuery: true
                },
                type: "replace"
              })
            })}
          />
        )}
      >
        <Table
          {...tableProps}
          pagination={{
            ...tableProps.pagination,
          }}
        >
          <Table.Column<Company>
            dataIndex="name"
            title="Company Title"
            defaultFilteredValue={getDefaultFilter("id", filters)}
            // filterIcon={<SearchOutlined />}
          //   filterDropdown={(...props) => (
          //     <FilterDropdown {...props}>
          //       <Input placeholder="Search Company" />
          //     </FilterDropdown>
          // )}
            render={(_, record) => (
              <Space>
                <CustomAvatar shape="square" name={record.name} src={record.avatarUrl} />
                <Text style={{ whiteSpace: "nowrap"}}>
                  {record.name}
                </Text>
              </Space>
            )}
          />
          <Table.Column<Company>
            dataIndex="totalRevenue"
            title="Open deals amount"
            render={(_, company) => (
              <Text>
                {currencyNumber(company?.dealsAggregate?.[0].sum?.value || 0)}
              </Text>
            )}
          />
          <Table.Column<Company>
            dataIndex="id"
            title="Actions"
            fixed="right"
            render={(value) => (
              <Space>
                <EditButton hideText size="small" recordItemId={value}/>
                <DeleteButton hideText size="small" recordItemId={value}/>
              </Space>
            )}
          />
        </Table>
      </List>

      {/* Modal props from create.tsx*/}
      {children}
    </div>
  )
}