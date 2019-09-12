import React from "react"
import Table from "components/Table.jsx"
import City from "services/City"
import dayjs from "dayjs"
import querystring from "querystring"
import FilterList from "components/FilterList.jsx"
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col
} from "reactstrap"

class CityList extends FilterList {
    constructor(props) {
        super(props)
        const params = querystring.parse(props.location.search.substring(1))
        this.state = {
            data: [],
            paging: {
                page: params.page || 1
            },
            isLoading: true,
            filter: {
                type: params.type || "",
                start_at: params.start_at || dayjs().format("YYYY-MM-DD"),
                end_at: params.end_at || dayjs().add(1, "day").format("YYYY-MM-DD")
            }
        }

        this.columns = [
            {
                name: "Nama",
                selector: "name",
                grow: 2,
                sortable: true
            },
            {
                name: "Alias",
                selector: "alias_name",
                grow: 2,
                sortable: true
            },
            {
                name: "Deskripsi",
                selector: "description",
                grow: 2,
                sortable: false
            },
            {
                name: "#",
                selector: "_id",
                sortable: false,
                grow: 2,
                center: true,
                cell: (row) => (
                  <Row noGutters={true}>
                    <Col>
                      <Button color="link" onClick={() => this.onClickEdit(row)}>
                        <i className="tim-icons icon-pencil" />
                      </Button>
                    </Col>
                    <Col>
                      <Button color="link">
                        <i className="tim-icons icon-trash-simple" onClick={() => this.onClickDelete(row)} />
                      </Button>
                    </Col>
                  </Row>
                )
            }
        ]
    }

    componentWillMount() {
        this.getData()
    }

    getData() {
        return City.get({})
            .then(result => {
                this.setState({
                    data: result.data.docs,
                    isLoading: false,
                    paging: {
                        total: result.total,
                        limit: result.limit,
                        page: result.page,
                        pages: result.pages
                    }
                })
            })
    }

    onClickEdit = (selectedTask) => {
        console.log(`Click Edit ${JSON.stringify(selectedTask)}`)
    }

    onClickDelete = (selectedTask) => {
        console.log(`Cilck Delete ${JSON.stringify(selectedTask)}`)
    }

    render() {
        const { data, filter, paging, isLoading, role } = this.state

        return (
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <Row>
                                    <Col className="text-left" sm="6">
                                        <CardTitle tag="h2">Daftar Kota</CardTitle>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                    
                                <Table 
                                    data={data} 
                                    columns={this.columns}
                                    progressPending={isLoading}
                                    defaultSortField="date"
                                    defaultSortAsc={false}
                                    paging={paging}
                                    onChangePaging={this.updatePaging}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default CityList
