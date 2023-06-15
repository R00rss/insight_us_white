def formatOneRow(result):
  response =[]
  for res in result:
    if(len(res) > 0):
      response.append(res[0])
  return response
