import { useState, useRef, useMemo } from 'react';
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
  useAsyncDebounce,
} from 'react-table';

import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

import { FaSortUp } from 'react-icons/fa';
import { FaSortDown } from 'react-icons/fa';
import { FaSort } from 'react-icons/fa';

import exportToExcel from '../utils/exportToExcel';
import copyToClipboard from '../utils/copyToClipboard';
import { da } from 'date-fns/locale';

export default function DataTable({ columns, data }) {
  // Create a "myRef" variable to select DOM item
  const myRef = useRef();
  // Function to copy data to clipboard
  const handleCopy = (ref) => {
    copyToClipboard(ref);
  };
  // Function to convert spreadsheet to a binary data for download
  const handleDownload = (ref) => {
    exportToExcel(ref);
  };

  // React-Table Hooks
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    rows,
    nextPage,
    previousPage,
    prepareRow,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns: useMemo(() => columns, []),
      // data: useMemo(() => data, []), // might not show updates
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  // From
  let from = state.pageIndex === 0 ? 1 : state.pageIndex * state.pageSize + 1;
  // To
  let to = state.pageIndex * state.pageSize + page.length;
  // Mensaje
  let mensaje = '';
  // Displaying results
  if (rows.length === 0) {
    mensaje = 'No hay resultados';
  } else if (rows.length === data.length) {
    mensaje = `Mostrando registros del ${from} al ${to} de un total de ${data.length}`;
  } else {
    mensaje = `Mostrando registros del ${from} al ${to} de un total de ${rows.length} (filtrados)`;
  }

  const { globalFilter, pageIndex, pageSize } = state;

  // Global filter search value
  const [value, setValue] = useState(globalFilter);

  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200); // 200 millisecond delay after typing in search box

  // Alternate Pagination that displays page numbers
  // Add: {items}
  let items = [];
  for (let number = 1; number <= pageCount; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === pageIndex + 1}
        onClick={() => gotoPage(number - 1)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <>
      {/* Show filas, Copy, Excel & Buscar... */}
      <div className='d-flex flex-wrap mb-2'>
        <div className='me-auto'>
          <ButtonGroup>
            <DropdownButton
              as={ButtonGroup}
              title={`Mostrar ${pageSize} filas`}
              id='bg-nested-dropdown'
              variant='secondary'
            >
              <Dropdown.Item
                key={data.length}
                value={data.length}
                onClick={() => setPageSize(data.length)}
              >
                Todas
              </Dropdown.Item>
              {[10, 25, 50].map((pageSize) => (
                <Dropdown.Item
                  key={pageSize}
                  value={pageSize}
                  onClick={() => setPageSize(pageSize)}
                >
                  {pageSize}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            <Button variant='secondary' onClick={() => handleCopy(myRef)}>
              Copy
            </Button>
            <Button variant='secondary' onClick={() => handleDownload(myRef)}>
              Excel
            </Button>
          </ButtonGroup>
        </div>
        <div>
          <Form>
            <FormControl
              type='search'
              placeholder='Buscar...'
              value={value || ''}
              onChange={(e) => {
                setValue(e.target.value);
                onChange(e.target.value);
              }}
            />
          </Form>
        </div>
      </div>
      {/* Table */}
      <Row>
        <Table
          ref={myRef}
          striped
          bordered
          hover
          size='sm'
          responsive
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    <div className='d-flex justify-content-between flex-nowrap'>
                      <div>{column.render('Header')}</div>
                      <div>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <FaSortDown />
                          ) : (
                            <FaSortUp />
                          )
                        ) : (
                          <FaSort color='grey' />
                        )}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            {footerGroups.map((group) => (
              <tr {...group.getFooterGroupProps()}>
                {group.headers.map((column) => (
                  <td {...column.getFooterProps()}>
                    {column.render('Footer')}
                  </td>
                ))}
              </tr>
            ))}
          </tfoot>
        </Table>
      </Row>
      {/* Pages */}
      <div className='d-flex justify-content-between flex-wrap'>
        <div>{mensaje}</div>
        <div>
          Ir a página:{' '}
          <input
            type='number'
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '100px' }}
          />{' '}
          de {pageOptions.length}
        </div>
        <div>
          <Pagination>
            <Pagination.First
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            />
            <Pagination.Prev
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            />

            <Pagination.Next
              onClick={() => nextPage()}
              disabled={!canNextPage}
            />
            <Pagination.Last
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            />
          </Pagination>
        </div>
      </div>
    </>
  );
}
