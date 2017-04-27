Problem to Solve:

# Convert the string:
"(id,created,employee(id,firstname,employeeType(id), lastname),location)"

to the following output:

id
created
employee
- id
- firstname
- employeeType
-- id
- lastname
location

# Bonus (output in alphabetical order):
created
employee
- employeeType
-- id
- firstname
- id
- lastname
id
location
