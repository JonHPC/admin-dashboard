import React, { useMemo } from "react";
import { User } from "@/graphql/schema.types";
import { Button, Card, ConfigProvider, Dropdown, MenuProps, theme } from "antd";
import { Text } from "@/components/text";
import { DeleteOutlined, EyeOutlined, MoreOutlined } from "@ant-design/icons";
import { TextIcon } from "@/components/text-icon";
type ProjectCardProps = {
  id: string,
  title: string,
  updatedAt: string,
  dueDate?: string,
  users?: {
    id: string,
    name: string,
    avatarUrl?: User['avatarUrl']
  }[]
}

const ProjectCard = ({ id, title, dueDate, updatedAt, users }: ProjectCardProps) => {
  const { token } = theme.useToken()

  const edit = () => {

  }

  const dropdownIems = useMemo(() => {
    const dropdownItems: MenuProps['items'] = [
      {
        label: "View card",
        key: "1",
        icon: <EyeOutlined />,
        onClick: () => {
          edit()
        }
      },
      {
        danger: true,
        label: "Delete card",
        key: "2",
        icon: <DeleteOutlined />,
        onClick: () => {}
      }
    ]

    return dropdownItems;
  }, [])

  return (
    <ConfigProvider
      theme={{
        components: {
          Tag: {
            colorText: token.colorTextSecondary,
          },
          Card: {
            headerBg: "transparent"
          }
        }
      }}
    >
      <Card
        size="small"
        title={<Text ellipsis={{tooltip: title}}>{title}</Text>}
        onClick={() => edit()}
        extra={
          <Dropdown
            trigger={["click"]}
            menu={{
              items: dropdownItems
            }}
            placement="bottom"
            arrow={{pointAtCenter: true}}
          >
          <Button
            type="text"
            shape="circle"
            icon={
              <MoreOutlined
                style={{
                  transform: "rotate(90deg)"
                }}
              />
            }
            onPointerDown={(e) => {
              // Nothing will happen once the pointer is down, except clicking the button
              e.stopPropagation()
            }}
            onClick={(e) => {
              e.stopPropagation()
            }}
          />
          </Dropdown>
        }
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "8px"
          }}
        >
          <TextIcon style={{marginRight: "4px"}}/>
          //TODO: Left off at 4:35:09
        </div>
      </Card>
    </ConfigProvider>
  )
}

